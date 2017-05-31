export default function({ dispatch }) {
    return next => action => {
        // If the action does not have payload
        // or, the payload does not have .then property
        // we dont care about it, send it on
        if (!action.payload || !action.payload.then) {
            return next(action);
        }

        // Make sure the action's promise resolves
        action.payload
            .then(function(response) {
               const newAction = { ...action, payload: response };
               // dispatch runs the action all over again from the beginning
               dispatch(newAction); 
            });
        }
    // same as
        // return function(next) {
        //     return function(action) {
        //         console.log(action);

        //         next(action);
        //     }
        // }
}