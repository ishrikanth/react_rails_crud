class Fruit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            errors: {}
        }
        this.handleEdit = this.handleEdit.bind(this);
    }



    handleEdit() {
        if (this.state.editable) {
            let name = this.name.value
            let description = this.description.value
            let errors = {}
            let formIsValid = true

            if (!name) {
                formIsValid = false;
                errors["name"] = "Cannot be empty";
            }
            if (!description) {
                formIsValid = false;
                errors["description"] = "Cannot be empty";
            }
            this.setState({errors: errors});


            let id = this.props.fruit.id
            let fruit = {id: id, name: name, description: description}
            if (formIsValid) {
                this.props.handleUpdate(fruit)
                this.setState({editable: false})
                return;
            } else {
                this.setState({editable: true})
                return;
            }
        }
         this.setState({editable: !this.state.editable})
    }

    render() {
        let name = this.state.editable ?
            <input type='text' ref={input => this.name = input} defaultValue={this.props.fruit.name}
                   class="form-control"/>: <h3>{this.props.fruit.name}</h3>

        let description = this.state.editable ?
            <input type='text' ref={input => this.description = input} defaultValue={this.props.fruit.description}
                   class="form-control"/> : <p>{this.props.fruit.description}</p>
        return (
            <div class="row">
                <h1>{name}</h1>
                <span style={{color: 'red'}}>{this.state.errors['name']}</span>
                <p>{description}</p>
                <span style={{color: 'red'}}>{this.state.errors['description']}</span>
                <div class="btn-toolbar">
                    <button onClick={() => this.handleEdit()}
                            class="btn btn-primary"> {this.state.editable ? 'Submit' : 'Edit'}</button>
                    <button onClick={() => this.props.handleDelete(this.props.fruit.id)} class="btn btn-danger">Delete
                    </button>
                </div>
            </div>
        )
    }
}