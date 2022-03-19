import { CardContent, Typography } from '@mui/material'
import React, { FC } from 'react'
import { TaskIterface } from '../../interfaces/boardInterface'
import User from '../common/User'

interface TaskProps {
	task: TaskIterface
}

const Task: FC<TaskProps> = ({ task }) => {
	return (
		<CardContent>
			<Typography
				color='textPrimary'
				gutterBottom
				style={{ fontSize: 18 }}
			>
				{task?.title}
			</Typography>
			<Typography
				color='textPrimary'
				style={{ fontSize: 16 }}
			>
				{task?.description}
			</Typography>
			<User user={task?.assignee} />
		</CardContent>
	)
}

export default Task