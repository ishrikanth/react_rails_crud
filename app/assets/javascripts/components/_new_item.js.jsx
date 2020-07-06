class NewFruit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            formFields: {}
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        // this.addNewFruit = this.addNewFruit.bind(this);
    }

    handleFormSubmit(name, description) {
        let formIsValid = true;
        let errors = {};

        if (!name) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }
        if (!description) {
            formIsValid = false;
            errors["description"] = "Cannot be empty";
        }
        this.setState({errors: errors});

        if (formIsValid) {
            let body = JSON.stringify({fruit: {name: name, description: description}})
            fetch('/api/v1/fruits.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            }).then((response) => {
                return response.json()
            })
                .then((fruit) => {
                    this.props.addNewFruit(fruit)
                })
        } else {
            // alert("Form has errors.")
        }
    }

    render() {
        return (
            <div class="row">
                <form class="well" onSubmit={(e) => {
                    e.preventDefault();
                    this.handleFormSubmit(
                        this.state.formFields.name.value,
                        this.state.formFields.description.value
                    );
                    e.target.reset();
                }}>
                    <div className="form-group">
                        <input ref={input => this.state.formFields.name = input} placeholder='Enter the name of the item'
                               class="form-control" />
                        <span style={{color: "red"}}>{this.state.errors["name"]}</span>

                    </div>
                    <div className="form-group">
                        <input ref={input => this.state.formFields.description = input} placeholder='Enter a description'
                               class="form-control" />
                        <span style={{color: "red"}}>{this.state.errors["description"]}</span>
                    </div>
                    <div className="form-group">
                        <button class="btn btn-primary mb-2">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

