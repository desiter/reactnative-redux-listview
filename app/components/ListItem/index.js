import React, { Component, PropTypes } from 'react';
import { Text, View, Image } from 'react-native';
import { getVenuePhotos, makePhotoUrl } from '../../services/foursquare';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles.js';

export default class ListItem extends Component {
    constructor() {
        super();
        this.state = {
            photoUrl: ''
        }
    }

    componentDidMount() {
        const { id } = this.props.data;
        getVenuePhotos(id, 1)
            .then(photos => photos.map(photo => makePhotoUrl(photo, '500')))
            .then(urls => {
                if (urls.length) {
                    this.setState({ photoUrl: urls[0] })
                }
            });
    }

    renderImage() {
        return this.state.photoUrl ?
            (
                <Image style={styles.imagePlaceholder} source={{ uri: this.state.photoUrl }} />
            ) :
            (
                <View style={styles.imagePlaceholder} />
            );
    }

    render() {
        const { name, location, distance } = this.props.data;
        return (
            <View style={styles.listItem}>
                {this.renderImage()}
                <View style={styles.distanceContainer}>
                    <Icon name="location-on" style={styles.distanceText} />
                    <Text style={styles.distanceText}>{distance}m</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.listItemTitle}>{name}</Text>
                    <Text style={styles.listItemDescription}>{location.address}, {location.city}</Text>
                </View>
            </View>
        );
    }
}

ListItem.propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func
};

ListItem.defaultProps = {
    data: { name: 'Untitled' }
};
