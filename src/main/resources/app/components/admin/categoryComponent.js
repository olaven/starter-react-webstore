
import React from 'react';

import CategoryListComponent from './categoryListComponent';
import SearchComponent from '../searchComponent';
import DialogComponent from '../dialogComponent';


// Material UI
import Paper from '@material-ui/core/Paper'; 
import Table from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody'; 
import TableHead from '@material-ui/core/TableHead'; 
import TableRow from '@material-ui/core/TableRow'; 
import TableCell from '@material-ui/core/TableCell'; 
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button'; 


export default class CategoryComponent extends React.PureComponent {
    constructor(arg){
        super(arg)
        this.state = {
            open : false,
            searchValue: "",
            dialogType: "",
            message: "",
            categoryToBeRemoved: ""
        }
    }

    searchCategoryOnChange(value){
        this.setState({
          searchValue : value
        })
      }

    toggleDialog(type, message, category){
        if(type){
            this.setState({ dialogType: type, open: true, message: message, categoryToBeRemoved: category })
        } else {
            this.setState({ dialogType: "", open: false, message: "" })
        }
    }

    render(){ 
        return (
            <div>
                <DialogComponent 
                    open = {this.state.open} 
                    type= {this.state.dialogType} 
                    onClose={this.toggleDialog.bind(this)}
                    submit = {this.props.submit}
                    message={this.state.message}
                    remove={this.props.deleteCategory}
                    openToaster={this.props.openToaster} 
                    toBeRemoved={this.state.categoryToBeRemoved}
                />

                <Typography variant="display3" gutterBottom>
                    Categories
                </Typography>

                <SearchComponent value={this.state.searchValue} onChange={this.searchCategoryOnChange.bind(this)}/>
                <Button 
                    onClick={() => this.setState({ open: true})}
                    color="primary">
                    add Category
                </Button>
                

                <Paper>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Filter</TableCell>
                            <TableCell>Visible</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.props.categories.map(category => {
                            if (category.title.toUpperCase()
                                .includes(this.state.searchValue.toUpperCase()
                                )) {
                            return <CategoryListComponent 
                                toggleDialog={this.toggleDialog.bind(this)}
                                category={category} 
                                key={category.id} 
                                visible={category.visible} 
                                toggleVisible={this.props.toggleVisible} />;

                            }
                        })}
                        </TableBody>
                    </Table>
                    <Button 
                        color="primary"
                        onClick={() => this.props.openToaster("Changes were saved, NOT! This button does nothing....")} 
                    >
                        Save changes
                    </Button>
                </Paper>
            </div>
        )
    }
}