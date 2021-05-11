import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import jwt_decode from 'jwt-decode';
import { modifyGeneralData } from '../../utils/UserFunctions'


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    paper: {
        marginTop: theme.spacing.unit * 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.unit * 3,
    },

    avatar: {
        height: '60px',
        width: '60px',
        backgroundColor: theme.palette.primary.main,
    },

    margins: {
        padding: theme.spacing.unit * 3,
    },
    margins2: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },

    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    margin: {
        margin: theme.spacing(1),
    },
    multilineColor: {
        color: 'black'
    }
});

const ValidationTextField = withStyles({
    root: {
        "& .MuiFormLabel-root": {
            color: "black" // or black
        },
        '& input:valid + fieldset': {
            borderColor: '#01579b',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: '#01579b',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);

class LoginForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        gender: '',
        specialization: "",
        experience: 0,
        dateOfBirth: "",
        currentUserID: "",
    }
    constructor(props) {
        super(props);
        this.state.firstName = this.props.currentUser.firstName;
        this.state.lastName = this.props.currentUser.lastName;
        this.state.gender = this.props.currentUser.gender;
        this.state.specialization = this.props.currentUser.specialization;
        this.state.experience = this.props.currentUser.experience;
        this.state.dateOfBirth = this.props.currentUser.dateOfBirth;
    }

    async componentWillMount() {
        const token = localStorage.usertoken

        if (token) {
            try {
                const decoded = jwt_decode(token)
                const userIdToBeSent = decoded._id;

                this.setState({
                    currentUserID: userIdToBeSent
                })
            } catch (err) {
                alert(err);
            }

        }

    }

    changeField = (event) => {
        console.log(event.target.id);
        let userToLogin = { ...this.state };
        userToLogin[event.target.id] = event.target.value;
        this.setState({
            ...userToLogin
        })
        console.log(this.state.country);
    }

    onSubmit = (e) => {

        const generalData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            specialization: this.state.specialization,
            experience: this.state.experience,
            dateOfBirth: this.state.dateOfBirth,
            userID: this.state.currentUserID,
        }
        console.log("TESTING HfdsfdsERE: ", generalData);
        modifyGeneralData(generalData);

        this.props.onClose("modifyGeneralDataDialogOpen");
   
        e.preventDefault();
    }


    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <div className={classes.paper}>

                    <PersonIcon style={{
                        color: '#01579b',
                        height: '60px',
                        width: '60px',
                    }} />

                    <Typography component="h6" variant="h6" style={{ marginBottom: '15px', marginTop: '10px' }}>
                        Modify General Data
                    </Typography>
                    <Grid
                        justify="begin" // Add it here :)
                        container
                        spacing={1}
                    >
                        <Grid item>
                            <Typography style={{ textAlign: 'left' }} component="subtitle2" variant="subtitle2">
                                Be sure before submiting your changes
                            </Typography>
                        </Grid>
                    </Grid>
          
                    <div style={{ height: '20px' }} />
                    <form className={classes.form} onSubmit={this.onSubmit}>

                        <Grid container direction="row" spacing={6}>
                            <Grid item xs={6}>
                                <ValidationTextField
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    defaultValue={this.state.firstName}
                                    variant="outlined"
                                    onChange={this.changeField.bind(this)}
                                />
                                <div style={{ height: '20px' }} />
                                <ValidationTextField
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    defaultValue={this.state.lastName}
                                    variant="outlined"
                                    onChange={this.changeField.bind(this)}
                                />
                                <div style={{ height: '20px' }} />
                                <ValidationTextField
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    fullWidth
                                    id="experience"
                                    label="Experience"
                                    defaultValue={this.state.experience}
                                    variant="outlined"
                                    onChange={this.changeField.bind(this)}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <ValidationTextField
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    fullWidth
                                    id="gender"
                                    label="Gender"
                                    defaultValue={this.state.gender}
                                    variant="outlined"
                                    onChange={this.changeField.bind(this)}
                                />
                                <div style={{ height: '20px' }} />
                                <ValidationTextField
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    fullWidth
                                    id="specialization"
                                    label="Specialization"
                                    defaultValue={this.state.specialization}
                                    variant="outlined"
                                    onChange={this.changeField.bind(this)}
                                />

                                <div style={{ height: '20px' }} />
                               
                            </Grid>
                        </Grid>

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit Changes
                        </Button>
                    </form>
                </div>
            </main>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LoginForm));