import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk("todos", async () => {
	const res = await fetch("http://localhost:8000/todos");
	return await res.json();
});

export const deleteTodos = createAsyncThunk("todo/delete", async id => {
	const res = await fetch(`http://localhost:8000/todos/${id}`, {
		method: "DELETE",
	});

	return await res.json();
});

export const postTodos = createAsyncThunk("todo/add", async title => {
	const res = await fetch("http://localhost:8000/todos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title }),
	});

	return await res.json();
});

export const toggleTodos = createAsyncThunk("todo/check", async id => {
	const res = await fetch(`http://localhost:8000/todos/${id}`, {
		method: "PUT",
	});

	return await res.json();
});

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		tasks: [],
	},
	reducers: {
		add: (state, action) => {
			const id = state.tasks[0].id + 1;
			state.tasks.push({ id, name: action.payload, done: false });
		},
		del: (state, action) => {
			state.tasks = state.tasks.filter(item => item.id != action.payload);
		},
		toggle: (state, action) => {
			state.tasks = state.tasks.map(item => {
				if (item.id == action.payload) {
					item.done = !item.done;
				}

				return item;
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getTodos.fulfilled, (state, action) => {
				state.tasks = action.payload;
			})
			.addCase(postTodos.fulfilled, (state, action) => {
				state.tasks.push(action.payload);
			})
			.addCase(deleteTodos.fulfilled, (state, action) => {
				state.tasks = state.tasks.filter(
					item => item.id != action.payload.id
				);
			})
			.addCase(toggleTodos.fulfilled, (state, action) => {
				state.tasks = state.tasks.map(item => {
					if (item.id == action.payload.id) {
						item.done = !item.done;
					}

					return item;
				});
			});
	},
});

export const { add, del, toggle } = todoSlice.actions;
export default todoSlice.reducer;
