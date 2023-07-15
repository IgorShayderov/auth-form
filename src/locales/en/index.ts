export default {
  translation: {
    authForm: {
      title: 'Auth',
      inputs: {
        email: {
          label: 'Email',
          placeholder: 'Type your email',
        },
        password: {
          label: 'Password',
          placeholder: 'Type your password',
        },
      },
      buttons: {
        showPassword: {
          ariaLabel: 'toggle-password',
        },
        submit: {
          title: 'Sign in',
        },
      },
      messages: {
        invalidAuth: 'Login or password is invalid',
        success: 'Successfully authenticated!',
        failure: 'Authentication was unsuccessful. Try again.',
      },
    },
  },
};
