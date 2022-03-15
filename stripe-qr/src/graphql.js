import {gql} from '@apollo/client';

const SUBSCRIPTION  = gql`
subscription TokenCreated($id: uuid!) {
    token_by_pk(id: $id ) {
      id
      status
    }
  }

`
const UPDATE_TOKEN = gql`
mutation updateToken($id: uuid!, $status: String!) {
    update_token_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
      status
    }
  }

`
const ADD_TOKEN= gql`

mutation addToken($id:uuid!, $status:String!) {
    insert_token(objects: {id: $id, status: $status}) {
      returning {
        id
        status
      }
    }
  }

`


  



 
