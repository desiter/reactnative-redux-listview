import { StyleSheet } from 'react-native';
import { defaults } from 'lodash';

const padding = 10;
const height = 150;
const addressHeight = 60;
const addressPadding = 5;

const styles = StyleSheet.create({
    listItem: {
        height: 150,
    },
    listItemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    listItemDescription: {

    },
    distanceContainer: {
        position: 'absolute',
        top: padding + addressPadding,
        right: padding + addressPadding,
        height: 15,
        zIndex: 1,
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    distanceText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
    },
    imagePlaceholder: {
        flex: 1,
        height: height - 2 * padding,
        backgroundColor: '#581845',
    },
    address: {
        position: 'absolute',
        top: height - addressHeight,
        left: 0,
        right: 0,
        bottom: 0,
        padding: addressPadding,
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
});

export default styles;
