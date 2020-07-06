class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fruits: []
        };

        this.addNewFruit = this.addNewFruit.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteFruit = this.deleteFruit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }



    handleUpdate(fruit) {
        fetch(`/api/v1/fruits/${fruit.id}`,
            {
                method: 'PUT',
                body: JSON.stringify({fruit: fruit}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            this.updateFruit(fruit)
        })
    }

    updateFruit(fruit) {
        let newFruits = this.state.fruits.filter((f) => f.id !== fruit.id)
        newFruits.push(fruit)
        this.setState({
            fruits: newFruits
        })
    }

    handleDelete(id) {
        fetch(`/api/v1/fruits/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            this.deleteFruit(id)
        })
    }

    deleteFruit(id) {
        let newFruits = this.state.fruits.filter((fruit) => fruit.id !== id)
        this.setState({
            fruits: newFruits
        })
    }



    addNewFruit(fruit) {
        this.setState({
            fruits: this.state.fruits.concat(fruit)
        })
    }

    componentDidMount() {
     this.listAll()
    }

    listAll(){
        fetch('/api/v1/fruits.json')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({fruits: data})
            })
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    render() {
        return (
            <div>
                <NewFruit addNewFruit={this.addNewFruit}/>
                <AllFruits fruits={this.state.fruits} handleDelete={this.handleDelete}
                           handleUpdate={this.handleUpdate}/>
            </div>
        )
    }
}