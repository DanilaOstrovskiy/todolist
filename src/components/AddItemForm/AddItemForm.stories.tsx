import React from 'react';
import AddItemForm from "./AddItemForm";


export default {
    title: "AddItemForComponent",
    component: AddItemForm
}


export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addNewItem={(title: string)=>{alert(title)}} maxLengthUserMessage={20}/>

}