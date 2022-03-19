import { Avatar, Box } from '@mui/material'
import React, { FC } from 'react'
import { UserInterface } from '../../interfaces/userInterface'

interface UserProps {
	user: UserInterface
}

const User: FC<UserProps> = ({ user }) => {
	return (
		<Box
			display='flex'
			alignItems='center'
		>
			<Avatar src={user?.avatar} alt={user?.name} />
			<span style={{ padding: 15 }}>
				{user?.name}
			</span>
		</Box>
	)
}

export default User