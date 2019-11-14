import React, { Component } from 'react'
import Moment from 'react-moment'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import config from '../../../../../config'


class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            maintenanceTypes: [],
            error: null
        };
    }

    removeMaintenanceType = id => {
        const newMaintType = this.state.maintenanceTypes.filter(m =>
          m.id !== id
        )
        this.setState({
          maintenanceTypes: newMaintType
        })
        this.props.func.hideDelete()
      }
    
    setMaintenanceType = maintenanceTypes => {
        this.setState({
            maintenanceTypes: maintenanceTypes,
            error: null
        })
    }
    updateMaintenanceType = data => {
        this.setState({
            maintenanceTypes: [...this.state.maintenanceTypes, data],
            error: null
        })
    }

    componentDidMount(){
        fetch(config.MAINTENANCE_ENDPOINT, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(data => {
            this.setMaintenanceType(data)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    addMaintenanceType = (e) => {
        e.preventDefault()
        console.log('add maintenance type!!')
        const newMaintenanceType = {
                maindescr: e.target.promotion_name.value,
                company_id: 6,
                user_id: 1
        }
        console.log(newMaintenanceType)
        fetch(config.MAINTENANCE_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newMaintenanceType),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(data => {
            this.updateMaintenanceType(data)
            this.props.func.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        })
        
    }


    render(){  
        const maint = this.props.func
        return (
            <>
                <Modal className='add-modal' show={maint.show} >
                    <form 
                        className= 'add-content'
                        onSubmit={(e) => this.addMaintenanceType(e)}
                    >
                        <h3>Add a Maintenance Type</h3>
                        <div className='form-group'>
                            <label htmlFor='promotion_name'></label>
                            <TextInput 
                                id='promotion_name'
                                name='promotion_name'
                                label='Promotion Name'
                                type='text'
                                autoComplete='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>
                        <button onClick={maint.hideModal}>Cancel</button>
                    </div>
                </Modal>

                <div className='data-container'>
                    <h3>Maintenance</h3>
                    <button className='add-data' onClick={maint.showModal}>Add Maintenance Type</button>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date Created</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.maintenanceTypes.map(m => (
                            <tr key={m.id}>
                                <td>{m.maindescr}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{m.created_at}</Moment>
                                </td>
                                <td className='update'>
                                    <button>Update</button>
                                </td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => maint.updateDelete(m.maindescr, m.id)}
                                    >
                                        Delete
                                    </button>
                                    {(maint.delete) ? maint.deleteModal(config.MAINTENANCE_ENDPOINT, this.removeMaintenanceType) : null}                                    
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Maintenance