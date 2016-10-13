import React, { Component, PropTypes } from 'react';
import { TouchableHighlight } from 'react-native';
import { getVenuePhotos, makePhotoUrl } from '../../services/foursquare';
import VenueHeader from '../common/VenueHeader';
import styles from './styles';

export default class ListItem extends Component {
    constructor() {
        super();
        this.state = {
            photoUrl: '',
        };
    }

    componentDidMount() {
        const { id } = this.props.data;
        getVenuePhotos(id, 1)
            .then(photos => photos.map(photo => makePhotoUrl(photo, '500')))
            .then((urls) => {
                if (urls.length) {
                    this.setState({ photoUrl: urls[0] });
                }
            });
    }
    render() {
        const data = this.props.data;
        return (
            <TouchableHighlight style={styles.listItem} onPress={() => this.props.onPress(data)}>
                <VenueHeader data={data} photoUrl={this.state.photoUrl} />
            </TouchableHighlight>
        );
    }
}

ListItem.propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
};

ListItem.defaultProps = {
    data: { name: 'Untitled' },
    onPress: () => { },
};
