import { Delete } from '@mui/icons-material'
import { Box, Button, CardContent, IconButton, Typography } from '@mui/material'
import { _resetGlobalState } from 'mobx'
import React, { FC } from 'react'
import useStore from '../../hooks/useStore'
import { TaskIterface } from '../../interfaces/boardInterface'
import User from '../common/User'

interface TaskProps {
  sectionId: string,
	task: TaskIterface
}

const Task: FC<TaskProps> = ({ sectionId, task }) => {
  const {boards} = useStore()
  const removeFun = () => {
    boards.active.removeTask(sectionId, task.id)
  }
  return (
		<CardContent
    >
			<Box
        sx={{display: 'flex', justifyContent: 'space-between'}}
      >      
        <Typography
				  color='textPrimary'
				  gutterBottom
				  style={{ fontSize: 18 }}
			  >
				  {task?.title}
			  </Typography>
        {
          task?.date ? 
          <Button
            variant='outlined'
            color={new Date() <= new Date(task?.date) ? 'success' : 'error'}
          >
            {task?.date}
          </Button>
          :
          null
        }
      </Box>
			<Typography
				color='textPrimary'
				style={{ fontSize: 16 }}
			>
				{task?.description}
			</Typography>
			<User user={task?.assignee} />
		  <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <IconButton
          sx={{width: 30, justifySelf: 'flex-end'}}
          onClick={removeFun}
        >
          <Delete/>
        </IconButton>
      </Box>
    </CardContent>
	)
}

export default Task
