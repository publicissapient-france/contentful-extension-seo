import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SvgAttachement from '../svg/SvgAttachement'
import SvgAddSmall from '../svg/SvgAddSmall'
import SvgTrashSmall from '../svg/SvgTrashSmall'

import { Container, UploadView, ViewPort, IconContainer, Actions, Preview } from './styled';

class ImageUploader extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    onClickLinkExisting = async () => {
        const selectedAsset = await this.props.extension.dialogs.selectSingleAsset({
            locale: this.props.extension.field.locale
        });
        try {
           this.props.updateImage(selectedAsset.fields.file[this.props.extension.locales.default].url)
        } catch (err) {
            this.onError(err);
        }
    }

    onClickNewAsset =  async () => {
            const selectedAsset = await this.props.extension.navigator.openNewAsset({ slideIn: { waitForClose: true } }).then(({ entity }) => {
                return entity;
            }).then(selectedEntry => {
                this.props.updateImage(selectedEntry.fields.file[this.props.extension.locales.default].url)
            })
    }

    removeImage = () => {
        this.props.updateImage('')
    }

    render = () => {
        const { image } = this.props;
        return (
            <Container>
                <UploadView>
                    <ViewPort>
                        {
                            !image || image === '' ?
                                <label>empty</label>
                                :  <Preview style={{ backgroundImage: `url(https:${ image })` }}/>
                        }
                    </ViewPort>
                    <Actions>
                        <div>
                            <IconContainer onClick={() => { this.onClickLinkExisting() }}>
                                <SvgAttachement/>
                            </IconContainer>
                            <IconContainer onClick={() => { this.onClickNewAsset()}}>
                                <SvgAddSmall/>
                            </IconContainer>
                        </div>
                        <IconContainer className={['delete', image && image !== '' ? 'available' : '']} onClick={(e) => {
                            if(!image || image === ''){
                                e.preventDefault();
                            } else{
                                this.removeImage()
                            }
                        }}>
                            <SvgTrashSmall/>
                        </IconContainer>
                    </Actions>
                </UploadView>
            </Container>

        );
    }
}

ImageUploader.protoTypes = {
    image : PropTypes.string
};

const mapStateToProps = ( state ) => ({
    extension : state.extension
});
export default connect(mapStateToProps)(ImageUploader);
