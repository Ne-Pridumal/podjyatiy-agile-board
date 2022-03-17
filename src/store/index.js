import { types } from 'mobx-state-tree';
import UsersStore from './users';
import BoardStore from './boards';

const RootStore = types.model("Root", {
	users: types.optional(UsersStore),
	board: types.optional(BoardStore),
});

export default RootStore;