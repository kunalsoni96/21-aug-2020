import React from 'react';
import {View, Text} from 'react-native';
import AnimatedMultistep from "react-native-animated-multistep";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import StepSix from "./steps/StepSix";

const allSteps = [
    { name: "step 1", component: StepOne },
    { name: "step 2", component: StepTwo },
    { name: "step 3", component: StepThree },
    { name: "step 4", component: StepFour },
    { name: "step 5", component: StepFive },
    { name: "step 6", component: StepSix }
];

/* Define your class */
export default class Multistep extends React.Component {
    /* define the method to be called when you go on next step */

    onNext = () => {
        console.log("Next");
    };

    /* define the method to be called when you go on back step */

    onBack = () => {
        console.log("Back");
    };

    /* define the method to be called when the wizard is finished */

    finish = finalState => {
        console.log(finalState);
    };

    /* render MultiStep */
    render() {
        return (
            <View style={{ flex: 1 }}>
                <AnimatedMultistep
                    {...this.props.navigation.navigate('Profile')}
                    steps={allSteps}
                    onFinish={this.finish}
                    onBack={this.onBack}
                    onNext={this.onNext}
                    comeInOnNext="bounceInUp"
                    OutOnNext="bounceOutDown"
                    comeInOnBack="bounceInDown"
                    OutOnBack="bounceOutUp"
                />
            </View>
        );
    }
}