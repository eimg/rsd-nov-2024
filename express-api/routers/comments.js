const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { auth, isOwner } = require("../middlewares/auth");

router.post("/posts/:id/comments", auth, async (req, res) => {
	const postId = req.params.id;
    const userId = res.locals.user.id;
	const { content } = req.body;

	try {
        // Get post to check owner
        const post = await prisma.post.findUnique({
            where: { id: parseInt(postId) },
            select: { userId: true }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

		const comment = await prisma.comment.create({
			data: {
				content,
				postId: parseInt(postId),
				userId: userId,
			},
			include: {
				user: true,
			},
		});

        // Create notification if the comment is not from post owner
        if (post.userId !== userId) {
            await prisma.notification.create({
                data: {
                    type: "COMMENT",
                    userId: post.userId,
                    actorId: userId,
                    postId: parseInt(postId),
                    read: false,
                }
            });
        }

		res.json(comment);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.delete("/comments/:id", auth, async (req, res) => {
	const commentId = parseInt(req.params.id);

	try {
		// Check if comment exists and user is the owner
		const comment = await prisma.comment.findUnique({
			where: { id: commentId },
		});

		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}

		if (comment.userId !== res.locals.user.id) {
			return res.status(403).json({ error: "Not authorized" });
		}

		// Delete the comment
		await prisma.comment.delete({
			where: { id: commentId },
		});

		res.json({ message: "Comment deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = { commentsRouter: router };
