import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import React, { FC, useCallback, useState } from 'react'
import useStore from '../../hooks/useStore'
import Column from './Column'
import NewTaskDialog from './NewTaskDialog'
function getListStyle(isDraggingOver: boolean) {
	return {
		backgroundColor: isDraggingOver ? 'lightblue' : 'lightgray',
		padding: 8,
		minHeight: 500
	}
}
const Dashboard: FC = () => {
	const { boards } = useStore()
	const [newTaskToSection, setNewTaskToSection] = useState(null)

	const closeDialog = useCallback(() => {
		setNewTaskToSection(null)
	}, [setNewTaskToSection])

	const onDragEnd = useCallback((event) => {
		const { source, destination, draggableId: taskId } = event;
		boards.active.moveTask(taskId, source, destination);
	}, [boards])
	return (
		<Box p={2}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Grid container spacing={1}>
					{boards.active?.sections.map(section => (
						<Grid item key={section.id} xs>
							<Paper>
								<Box p={1} display='flex'
									alignItems={'center'}
									justifyContent={'center'}>
									<Typography variant='h5' marginRight={1}>{section?.title}</Typography>
									<Button
										variant='outlined'
										color='primary'
										style={{ minWidth: 136 }}
										onClick={() => setNewTaskToSection(section.id)}
									>
										Add New Task
									</Button>
								</Box>
								<Droppable droppableId={`${section.id}`}>
									{(provided, snapshot) => (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											style={getListStyle(snapshot.isDraggingOver)}
										>
											<Column section={section} />
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</Paper>
						</Grid>
					))}
				</Grid>
			</DragDropContext>
			<NewTaskDialog open={!!newTaskToSection} handleClose={closeDialog} activeSection={newTaskToSection} />
		</Box>
	)
}

export default observer(Dashboard)