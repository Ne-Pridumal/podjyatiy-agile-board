import { flow, getParent, onSnapshot, types } from "mobx-state-tree";
import { v4 as uuidv4 } from 'uuid'
import { User } from "./users";
import ApiCall from '../api'

const Task = types.model('Tasks', {
	id: types.identifier,
	title: types.string,
	description: types.maybe(types.string),
	assignee: types.safeReference(User),
  date: types.maybe(types.string),
})

const BoardSection = types.model('BoardSection', {
	id: types.identifier,
	title: types.string,
	tasks: types.array(Task)
})
	.actions(self => {
		return {
			load: flow(function* () {
				const { id: boardID } = getParent(self, 2);
				const { id: status } = self;
				const { tasks } = yield ApiCall.get(`boards/${boardID}/tasks/${status}`);
				self.tasks = tasks;
				onSnapshot(self, self.save);
			}),
			afterCreate() {
				self.load();
			},
			save: flow(function* ({ tasks }) {
				const { id: boardID } = getParent(self, 2)
				const { id: status } = self;
				yield ApiCall.put(`boards/${boardID}/tasks/${status}`, { tasks })
			})
		}
	})

const Board = types.model('Board', {
	id: types.identifier,
	title: types.string,
	sections: types.array(BoardSection)
}).actions(self => {
	return {
		moveTask(taskId, source, destination) {
			const fromSection = self.sections.find(section => section.id === source.droppableId);
			const toSection = self.sections.find(section => section.id === destination.droppableId);

			const taskToMoveIndex = fromSection.tasks.findIndex(task => task.id === taskId);
			const [task] = fromSection.tasks.splice(taskToMoveIndex, 1);

			toSection.tasks.splice(destination.index, 0, task.toJSON());
		},
		addTask(sectionId, payload) {
			const section = self.sections.find(section => section.id === sectionId);
			section.tasks.push({
				id: uuidv4(),
				...payload
			})
		},
    removeTask(sectionId, taskId){
      const section = self.sections.find(section => section.id === sectionId)
      const taskRemoveIndex = section.tasks.findIndex(task => task.id === taskId)
      section.tasks.splice(taskRemoveIndex, 1)
    },
	}
})

const BoardStore = types.model("BoardStore", {
	boards: types.optional(types.array(Board), []),
	active: types.safeReference(Board),
})
	.views(self => {
		return {
			get list() {
				return self.boards.map(({ id, title }) => ({ id, title }))
			}
		}
	})
	.actions(self => {
		return {
			load: flow(function* () {
				self.boards = yield ApiCall.get('boards');
			}),
			afterCreate() {
				self.load();
			},
			selectBoard(id) {
				self.active = id
			}
		}
	});

export default BoardStore;
