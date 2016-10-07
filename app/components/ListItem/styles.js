import { StyleSheet } from 'react-native';
import { defaults } from 'lodash';

const padding = 10;
const height = 150;
const detailsHeight = 60;
const detailsPadding = 5;

const styles = StyleSheet.create({
    listItem: {
        padding: padding,
        height: height
    },
    listItemTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    listItemDescription: {

    },
    distanceContainer: {
        position: 'absolute',
        top: padding + detailsPadding,
        right: padding + detailsPadding,
        height: 15,
        zIndex: 1,
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    distanceText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12
    },
    imagePlaceholder: {
        flex: 1,
        height: height - 2*padding,
        backgroundColor: '#581845'
    },
    details: {
        position: 'absolute',
        top: height - detailsHeight,
        left: padding,
        right: padding,
        bottom: padding,
        padding: detailsPadding,
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    }
});

export default styles;
