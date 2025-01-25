import { useSelector, useDispatch } from "react-redux";
import { deleteTodos, postTodos, toggleTodos } from "./todoSlice";

import { useRef } from "react";

export default function App() {
	const todo = useSelector(state =>
		state.todo.tasks.filter(item => !item.done)
	);
	const done = useSelector(state =>
		state.todo.tasks.filter(item => item.done)
	);

	const dispatch = useDispatch();

	const titleRef = useRef();

	return (
		<div>
			<h1>Todo</h1>
			<form
				onSubmit={e => {
					e.preventDefault();
					const title = titleRef.current.value;
					if (!title) return false;

					dispatch(postTodos(title));
					e.currentTarget.reset();
				}}
			>
				<input type="text" ref={titleRef} />
				<button type="submit">Add</button>
			</form>
			<ul>
				{todo.map(item => {
					return (
						<li key={item.id}>
							<button
								onClick={() => {
									dispatch(toggleTodos(item.id));
								}}
							>
								Check
							</button>

							{item.title}

							<button
								onClick={() => {
									dispatch(deleteTodos(item.id));
								}}
							>
								Delete
							</button>
						</li>
					);
				})}
			</ul>

			<h2>Completed</h2>
			<ul>
				{done.map(item => {
					return (
						<li key={item.id}>
							<button
								onClick={() => {
									dispatch(toggleTodos(item.id));
								}}
							>
								Undo
							</button>

							{item.title}

							<button
								onClick={() => {
									dispatch(deleteTodos(item.id));
								}}
							>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
