import React, { Component, PropTypes } from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles.js';

export default class VenueHeader extends Component {
    constructor() {
        super();
        this.state = {
            photoUrl: '',
        };
    }

    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    renderImage() {
        return this.props.photoUrl ?
            (
                <Image style={styles.imagePlaceholder} source={{ uri: this.props.photoUrl }} />
            ) :
            (
                <View style={styles.imagePlaceholder} />
            );
    }

    renderAddress() {
        const { location, name } = this.props.data;
        return location ? (
            <View style={styles.address}>
                <Text style={styles.listItemTitle}>{name}</Text>
                <Text style={styles.listItemDescription}>{location.address}, {location.city}</Text>
            </View>
        ) : null;
    }

    render() {
        const { name, distance } = this.props.data;
        return (
            <View ref={component => this._root = component} {...this.props} style={styles.listItem}>
                {this.renderImage()}
                <View style={styles.distanceContainer}>
                    <Icon name="location-on" style={styles.distanceText} />
                    <Text style={styles.distanceText}>{distance || 0}m</Text>
                </View>
                {this.renderAddress()}

            </View>
        );
    }
}

VenueHeader.propTypes = {
    data: PropTypes.object,
    photoUrl: PropTypes.string,
    onPress: PropTypes.func,
};

VenueHeader.defaultProps = {
    data: { name: 'Untitled' },
    onPress: () => { },
};
