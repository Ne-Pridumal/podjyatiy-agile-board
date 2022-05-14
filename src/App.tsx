import { StyledEngineProvider } from '@mui/material';
import { _startAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { createContext, FC } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import RootStore from './store';

const store = RootStore.create({})

export const StoreContext = createContext(store);

const App: FC = () => {
	return (
		<StoreContext.Provider value={store} >
			<Header />
			<main className="">
				<Dashboard />
			</main>
		</StoreContext.Provider>
	)
} 

export default observer(App); 
