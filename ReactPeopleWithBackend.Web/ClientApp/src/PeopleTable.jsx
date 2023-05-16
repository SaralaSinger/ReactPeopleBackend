import React from 'react';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import { produce } from 'immer';
import axios from 'axios';
class PeopleTable extends React.Component {
    state = {
        people: [],
        checkedPeople: [],
        currentPerson: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        isEditing: false
    }
    getAllPeople = () => {
        axios.get('/api/people/getpeople').then(res => {
            this.setState({ people: res.data });
        });
    }

    componentDidMount = () => {
        this.getAllPeople();
    }
    onCancel = () => {
        const newState = produce(this.state, draftState => {
            draftState.isEditing = false;
            draftState.currentPerson = {
                firstName: '',
                lastName: '',
                age: '',
                id: ''
            };
        });
        this.setState(newState);
    }
    onUpdate = () => {
        const { currentPerson } = this.state;
        axios.post('/api/people/updateperson', currentPerson).then(() => {
            this.getAllPeople();
            const newState = produce(this.state, draftState => {
                draftState.isEditing = false;
                draftState.currentPerson = {
                    firstName: '',
                    lastName: '',
                    age: '',
                    id: ''
                };
            });
            this.setState(newState);
        })
    }
    onAdd = () => {
        const { firstName, lastName, age } = this.state.currentPerson;
        axios.post('/api/people/addperson', { firstName, lastName, age }).then(() => {
            this.getAllPeople();
            const newState = produce(this.state, draftState => {
                draftState.currentPerson = {
                    firstName: '',
                    lastName: '',
                    age: '',
                    id: ''
                };
            });
            this.setState(newState);
        })
    }
    onDelete = p => {
        axios.post('/api/people/deleteperson', p).then(() => {
            this.getAllPeople();
        })
    }
    onEdit = p => {
        const newState = produce(this.state, draftState => {
            draftState.currentPerson = p;
            draftState.isEditing = true;
        });
        this.setState(newState);
    }
    onTextChange = e => {
        const newState = produce(this.state, draftState => {
            draftState.currentPerson[e.target.name] = e.target.value;
        });
        this.setState(newState);
    }
    onCheck = id => {  
        const { checkedPeople } = this.state;
        const newState = produce(this.state, draftState => {
            if (checkedPeople.includes(id)) {
                draftState.checkedPeople = checkedPeople.filter(i => i !== id);
            }
            else {
                draftState.checkedPeople = [...checkedPeople, id];
            }

        });
        this.setState(newState);
    }
    onCheckAll = () => {
        const { people, checkedPeople } = this.state;
        const newState = produce(this.state, draftState => {
            people.forEach((p) => {
                if (!checkedPeople.includes(p.id)) {
                    draftState.checkedPeople = [...draftState.checkedPeople, p.id];
                }
            })
        })
        this.setState(newState);
    }
    onUncheckAll = () => {
        const newState = produce(this.state, draftState => {
            draftState.checkedPeople = [];
        })
        this.setState(newState);
    }
    onDeleteAll = () => {
        const { checkedPeople } = this.state;
        axios.post('/api/people/deleteall', {
            ids: [...checkedPeople]
        }).then(() => {
            this.getAllPeople();
        })
    }
    render() {
        const { people, checkedPeople, currentPerson, isEditing } = this.state;
        return (
            <>
                <div className='container' style={{ marginTop: 60 }}>
                    <PersonForm
                        isEditing={isEditing}
                        onTextChange={this.onTextChange}
                        onUpdate={this.onUpdate}
                        onCancel={this.onCancel}
                        onAdd={this.onAdd}
                        person={currentPerson} />
                    <table className='table table-hover table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th style={{ width: "15%" }}>
                                    <button onClick={this.onDeleteAll} className='btn btn-danger w-100'>Delete All</button>
                                    <button disabled={checkedPeople.length === people.length} onClick={this.onCheckAll} className='btn btn-outline-danger w-100 mt-2'>Check All</button>
                                    <button disabled={checkedPeople.length === 0} onClick={this.onUncheckAll} className='btn btn-outline-danger w-100 mt-2'>Uncheck All</button>
                                </th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map(p => {
                                return <PersonRow
                                    onEdit={() => this.onEdit(p)}
                                    onCheck={() => this.onCheck(p.id)}
                                    onDelete={() => this.onDelete(p)}
                                    isChecked={checkedPeople.includes(p.id)}
                                    key={p.id}
                                    person={p} />
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default PeopleTable;