import * as React from 'react';
import useStore from './hooks/useStore';
import RootStore from './store';

const store = RootStore.create({})

export const StoreContext = React.createContext(store);

const App = () => {
	const { users } = useStore()
	console.log('users: ', users);
	return (
		<StoreContext.Provider value={store} >
			<div>app</div>
		</StoreContext.Provider>
	)
}

export default App;