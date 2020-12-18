import React, {FormEvent, useState} from 'react';
import {Segment, Form, Button} from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode : (editMode:boolean) => void;
    selectedActivity : IActivity | null;
    handleCreateActivity: (activity : IActivity ) => void;
    handleEditActivity: (activity : IActivity ) => void;
    submitting: boolean;
}

const ActivityForm : React.FC <IProps>= ({setEditMode , selectedActivity , handleCreateActivity, handleEditActivity, submitting}) => {

    const initializeForm = () => {
        if (selectedActivity) {
        return selectedActivity
        } else {
            return {
            id:'',
            title : '',
            category: '',
            description: '',
            date: '',
            city: '',
            venue: ''
        }; };

    };


    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleSubmit = () => {
        if(activity.id.length === 0) {
            let newActivity = {...activity, id:uuid()};
            handleCreateActivity(newActivity);
        } else {
            handleEditActivity(activity);
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const {name, value }  = event.currentTarget;
            setActivity({...activity, [name] : value});
    };

    



    return (
        <Segment clearing>
        <Form onSubmit = {handleSubmit}>
        <Form.Input
        onChange={handleInputChange}
        name='title'
        placeholder="Title"
         value={activity.title}
         />
        <Form.TextArea
        onChange={handleInputChange}
         rows={2} 
         placeholder="Description" 
         value={activity.description}
         name="description"

         />
        <Form.Input
        onChange={handleInputChange}
         placeholder="Category" 
          value={activity.category}
          name="category"
          />
        <Form.Input
        onChange={handleInputChange}
         type='datetime-local'
          placeholder='Date'
           value={activity.date}
           name="date"
           
           />
        <Form.Input
        onChange={handleInputChange}
         placeholder='City'
           value ={activity.city}
           name = 'city'
           />
        <Form.Input
        onChange={handleInputChange}
         placeholder="Venue" 
          value= {activity.venue}
          name = 'venue'
          
          />
        <Button loading={submitting} floated='right' positive type='submit' content='submit'/>
        <Button  onClick= {() => setEditMode(false)} floated='right'  type='submit' content='cancel'/>
        </Form>
        </Segment>
        
    )
}

export default ActivityForm;