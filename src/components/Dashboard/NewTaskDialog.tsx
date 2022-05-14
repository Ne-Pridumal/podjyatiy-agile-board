import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useCallback, useState } from 'react'
import useStore from '../../hooks/useStore'

interface NewTaskDialogProps {
	open: boolean,
	handleClose: () => void,
	activeSection: number
}
interface FormInterface {
	name: string,
	title: string,
	description: string,
	assignee: string,
  date: Date | null,
}

const NewTaskDialog: FC<NewTaskDialogProps> = ({ open, handleClose, activeSection }) => {
	const { users, boards } = useStore()
	const [formState, setFormState] = useState<FormInterface>()
	
  const updateFormState = useCallback((event) => {
		const { name, value } = event.target;
		setFormState((prevFormState: any) => ({
			...prevFormState,
			[name]: value,
		}));
	}, [setFormState])
  
	const addNewTask = useCallback((event) => {
		event.preventDefault()
		boards.active.addTask(activeSection, formState)
		handleClose()
	}, [formState, boards])

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				Creating A New Task:
			</DialogTitle>
			<form onSubmit={addNewTask}>
				<DialogContent style={{ minWidth: 500 }}>
					<Box p={1}>
						<TextField
							fullWidth
							required
							type='text'
							name='title'
							label='Title'
							onChange={updateFormState}
							value={formState?.title || ''}
						/>
					</Box>
					<Box p={1}>
						<TextField
							fullWidth
							required
							type='text'
							name='description'
							label='Description'
							maxRows={Infinity}
							onChange={updateFormState}
							value={formState?.description || ''}
						/>
					</Box>
					<Box p={1}>
						<FormControl fullWidth>
							<FormLabel component='div'>
								Assignee
							</FormLabel>
							<Select
								style={{ backgroundColor: '#fff' }}
								name='assignee'
								value={formState?.assignee || ''}
								onChange={updateFormState}
							>
								<MenuItem value='' disabled>
									-
								</MenuItem>
								{users.list.map(user => (
									<MenuItem key={user?.id} value={user?.id}>{user?.name}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
          <Box p={1}>
            <FormControl fullWidth>
              <FormLabel component='div'>
                Date
              </FormLabel>
              <TextField
                name='date'
                value={formState?.date || ''}
                onChange={updateFormState}
                type='date'
                />
            </FormControl>
          </Box>
				</DialogContent>
				<DialogContent>
					<Button
						onClick={handleClose}
						color='warning'
					>
						Close
					</Button>
					<Button
						type='submit'
						color='success'
					>
						Submit
					</Button>
				</DialogContent>
			</form>
		</Dialog >
	)
}

export default NewTaskDialog

