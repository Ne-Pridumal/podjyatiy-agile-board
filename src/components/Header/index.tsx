import { AppBar, Box, FormControl, Grid, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import useStore from '../../hooks/useStore'
import User from '../common/User'

const Header: FC = () => {
	const { boards, users } = useStore()
	return (
		<AppBar position='static'>
			<Toolbar variant='dense'>
				<Grid container
					display='flex'
					justifyContent='space-between'
					alignItems='center'>
					<Grid item>
						<Box display='flex'
							justifyContent='space-between'
							alignItems='center'>
							<Typography
								variant='h6'
							>
								Dashboard:
							</Typography>
							<FormControl variant='outlined'>
								<Select
									style={{ backgroundColor: '#fff' }}
									value={boards?.active?.id || ''}
									onChange={(event) => {
										const { value } = event.target;
										boards.selectBoard(value)
									}}
								>
									<MenuItem value='' disabled>
										-
									</MenuItem>
									{boards.list.map(b => {
										return (
											<MenuItem key={b.id} value={b?.id}>{b?.title}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						</Box>
					</Grid>
					<Grid item>
						<User user={users?.me} />
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

export default observer(Header)