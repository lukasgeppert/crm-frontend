import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

class AdminDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInfo: []
        };
    }
    
    setCompanyInfo = companyInfo => {
        this.setState({
            companyInfo
        })
    }

    componentDidMount(){
        const id = 6
        ApiService.getDataHalf(`${config.API_ENDPOINT}/companies/${id}`)
            .then(data => {
                this.setCompanyInfo(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='dash-container'>
                <h2>Welcome {this.state.companyInfo.company}</h2>
            </div>
        )
    }
}

export default AdminDash