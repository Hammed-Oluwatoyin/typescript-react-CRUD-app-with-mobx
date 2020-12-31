import { action, computed, configure, makeObservable, runInAction } from 'mobx';

import { observable } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IActivity } from '../models/activity';

configure({ enforceActions: 'always' })

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';



    constructor() {
        makeObservable(this, {
            activityRegistry: observable,
            activities: observable,
            loadingInitial: observable,
            editMode: observable,
            selectedActivity: observable,
            submitting: observable,
            loadActivities: action,
            handleDeleteActivity: action,
            handleCreateActivity: action,
            handleSelectActivity: action,
            openCreateForm: action,
            handleEditActivity: action,
            activitiesByDate: computed,


        })
    }

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }





    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list()
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id, activity);
                })
                this.activities = Array.from(this.activityRegistry.values());
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;

        this.submitting = false;
    }


    @action handleEditActivity = async (activity: IActivity) => {

        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            })


        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })

            console.log(error);
        }
    }



    @action handleCreateActivity = async (activity: IActivity) => {

        this.submitting = true;

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            console.log(error);
        }
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    };

    @action handleSelectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
        console.log(this.selectedActivity);
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }



    @action handleDeleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {

        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
                this.target = "";
            })

            console.log(error);

        }
    }

}






export default createContext(new ActivityStore());
