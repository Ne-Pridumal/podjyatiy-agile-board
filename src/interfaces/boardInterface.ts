import { UserInterface } from "./userInterface";

export interface TaskIterface {
	id: string,
	title: string,
	description: string,
	assignee: UserInterface,
}

export interface SectionInterface {
	id: string,
	tasks: Array<TaskIterface>
}

