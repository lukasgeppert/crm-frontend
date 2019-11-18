import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../pagecomponents/DeleteModal'

const csEndpoint = config.CUSTOMER_STATUS_ENDPOINT

class CustomerStatus extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount(){
        ApiService.getData(
            csEndpoint, 
            this.context.setData
        )        
    }

    componentDidUpdate() {
        ApiService.getData(
            csEndpoint, 
            this.context.setData
        )        
    }

    addCustomerStatus = (e) => {
        e.preventDefault()
        const newCustomerStatus = {
            csdesc: e.target.customer_status.value,
            company_id: 6,
            user_id: 1
        }
        ApiService.postData(
            csEndpoint, 
            newCustomerStatus, 
            this.context.updateData, 
            this.context.hideModal
        )
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        let updatedContent = {}

        if(e.target.status_type.value !== ''){
            updatedContent.csdesc = e.target.status_type.value
        }
        ApiService.updateData(
            csEndpoint, 
            id, 
            updatedContent, 
            this.context.hideUpdate
        )
    }

    
    render(){  
        const context = this.context
        return (
            <>
            <DeleteModal
                props={context}
                endpoint={csEndpoint}
            />
            <Modal className='update-modal' show={context.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'></label>
                                <TextInput
                                    id='status_type'
                                    name='status_type'
                                    label='Property Status Type'
                                    type='text'
                                />
                            </div>
                            <div className='update'>
                                <button type='submit'>Update</button>
                            </div>
                        </form>
                        <div className='cancel'>
                            <button onClick={context.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
                </Modal>
                <Modal className='add-modal' show={context.show} >
                    <form 
                        className='add-content' 
                        onSubmit={(e) => this.addCustomerStatus(e)}
                    >
                        <h3>Customer Status</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <TextInput 
                                id='customer_status'
                                name='customer_status'
                                label='Customer Status'
                                type='text'
                                autoComplete='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>                    
                        <button onClick={context.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Customer Status</h3>
                    <button className='add-data' onClick={context.showModal}>Add Customer Status</button>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Show In Portal</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.data.map(c => (
                            <tr key={c.id}>
                                <td>{c.csdesc}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{c.created_at}</Moment>
                                </td>
                                <td className='update'>
                                    <button onClick={() => context.updateUpdate(c.csdesc, c.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button onClick={() => context.updateDelete(c.csdesc, c.id)}>Delete</button>
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

export default CustomerStatus