import { Card } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { SectionInterface } from '../../interfaces/boardInterface'
import Task from './Task'

interface ColumnProps {
	section: SectionInterface,
}


const getItemStyle = (styles: object) => {
	return {
		padding: 8,
		marginBottom: 8,
		...styles
	}
}

const Column: FC<ColumnProps> = ({ section }) => {
	return (
		<div>
			{section?.tasks?.map((task, index) => (
				<Draggable draggableId={task.id} key={task.id} index={index}>
					{(provided) => (
						<Card
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							style={getItemStyle(provided.draggableProps.style)}
						>
							<Task task={task} sectionId={section.id} />
						</Card>
					)}
				</Draggable>
			))}
		</div>
	)
}

export default observer(Column)
