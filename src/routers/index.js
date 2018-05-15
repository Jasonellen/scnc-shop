import React, {Component} from 'react';
import NickModal from '@/components/NickModal'
import Routers from './router'
import BackHome from '@/components/BackHome'

export default class Enter extends Component {
	render() {
		return (
			<div style={{width:'100%',height:'100%'}}>
				<BackHome/>
				<Routers />
				<NickModal/>
			</div>
		);
	}
}
