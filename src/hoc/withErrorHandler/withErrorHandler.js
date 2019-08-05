import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                console.log(err);
                this.setState({error: err.message});
            });
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return(
                <Aux>
                    <Modal show={this.state.error}
                            backdropClicked={this.errorConfirmedHandler}>
                        {this.state.error}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;