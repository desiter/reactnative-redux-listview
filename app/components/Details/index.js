import React, { Component, PropTypes } from 'react';
import { Text, View, Image, Dimensions, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { assign, get } from 'lodash';
import { makePhotoUrl } from '../../services/foursquare';
import styles from './styles';
import VenueHeader from '../common/VenueHeader';
import { fetchDetails } from '../../actions';

export class Details extends Component {
    constructor() {
        super();
        this.state = {
            data: { },
            photos: [],
            configMode: false,
        };
    }

    componentWillMount() {
        const { itemId } = this.props;
        if (itemId) {
            this.props.dispatch(fetchDetails(itemId, this.props.location));
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.itemId !== this.props.itemId) {
            this.props.dispatch(fetchDetails(nextProps.data.id, this.props.location));
        }

        if (nextProps.data !== this.props.data) {
            this.setState({
                data: nextProps.data,
                photos: get(nextProps, 'data.photos.groups[0].items', []).map(photo => makePhotoUrl(photo, 500)),
            });
        }

        if (nextProps.error !== this.state.error) {
            this.setState({
                error: nextProps.error,
            });
        }
    }

    render() {
        const { name, location, distance } = this.state.data;
        const imageWidth = (Dimensions.get('window').width / 2) - 7.5;
        const photos = this.state.photos.slice(1);
        return (
            <View style={this.props.style}>
                <VenueHeader style={styles.header} data={this.state.data} photoUrl={this.state.photos[0]} />
                <Icon name="arrow-back" style={styles.closeButton} onPress={() => this.props.onClose()} />
                <View style={styles.content}>
                    {photos.map((uri, idx) => (
                        <Image key={`venue-photo-${idx}`} style={styles.photo} source={{ uri }} width={imageWidth} />
                    ))}
                </View>
            </View>
        );
    }
}

Details.propTypes = {
    itemId: PropTypes.string,
    data: PropTypes.object,
    location: PropTypes.object,
    style: PropTypes.number,
    onClose: PropTypes.func,
    dispatch: PropTypes.func,
};

Details.defaultProps = {
    itemId: { name: 'Untitled' },
    data: {},
    location: {},
    onClose() {},
    dispatch() {},
};

function select(state) {
    return assign({}, state.Details, { location: state.Location });
}

export default connect(select)(Details);
