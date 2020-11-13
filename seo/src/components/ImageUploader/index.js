import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import SvgAttachement from '../svg/SvgAttachement'
import SvgAddSmall from '../svg/SvgAddSmall'
import SvgTrashSmall from '../svg/SvgTrashSmall'

import {Container, UploadView, ViewPort, IconContainer, Actions, Preview} from './styled';

const ImageUploader = ({image, updateImage, extension}) => {

    const onClickLinkExisting = async () => {
        const selectedAsset = await extension.dialogs.selectSingleAsset({
            locale: extension.field.locale
        });
        try {
            updateImage(selectedAsset.fields.file[extension.locales.default].url)
        } catch (err) {
            this.onError(err);
        }
    }

    const onClickNewAsset = async () => {
        const selectedAsset = await extension.navigator.openNewAsset({slideIn: {waitForClose: true}}).then(({entity}) => {
            return entity;
        }).then(selectedEntry => {
            updateImage(selectedEntry.fields.file[extension.locales.default].url)
        })
    }

    const removeImage = () => updateImage('');

    return (
        <Container>
            <UploadView>
                <ViewPort>
                    {
                        !image || image === '' ?
                            <label>empty</label>
                            : <Preview style={{backgroundImage: `url(https:${ image })`}}/>
                    }
                </ViewPort>
                <Actions>
                    <div>
                        <IconContainer onClick={() => onClickLinkExisting()}>
                            <SvgAttachement/>
                        </IconContainer>
                        <IconContainer onClick={() => onClickNewAsset()}>
                            <SvgAddSmall/>
                        </IconContainer>
                    </div>
                    <IconContainer className={['delete', image && image !== '' ? 'available' : '']} onClick={(e) => {
                        if (!image || image === '') {
                            e.preventDefault();
                        } else {
                            removeImage();
                        }
                    }}>
                        <SvgTrashSmall/>
                    </IconContainer>
                </Actions>
            </UploadView>
        </Container>
    );
}

ImageUploader.protoTypes = {
    image: PropTypes.string,
    updateImage: PropTypes.func
};

const mapStateToProps = (state) => ({
    extension: state.extension
});
export default connect(mapStateToProps)(ImageUploader);
