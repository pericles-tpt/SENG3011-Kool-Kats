import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {getStateRestrictionAus} from './RequestData'

const RestrictionsOverlay = ({show}) => {
    const [restrictions, setRestrictions] = useState('')
    const [state, setState] = useState('')
    useEffect(() => {
        async function getInfo() {

            const res = await getStateRestrictionAus()
            setRestrictions(res)
        }
        try {
            getInfo()
        } catch {
            setRestrictions('Could not get restrictions')
        }
    }, [state])
    return (
        <Container 
            className="justify-content-md-center" 
            style={{
                margin: '5px', 
                display: show
            }}>
            <Row className="justify-content-md-center">
                <DropdownButton id="dropdown-item-button" title="View State Restrictions">
                    <Dropdown.Item as="button" onClick={() => setState('')}>None</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setState('ACT')}>ACT (Canberra)</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setState('NSW')}>New South Wales</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setState('NT')}>Northern Territory</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setState('QLD')}>Queensland</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setState('SA')}>South Australia</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setState('TAS')}>Tasmania</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setState('WA')}>Western Australia</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setState('VIC')}>Victoria</Dropdown.Item>
                </DropdownButton>
            </Row>
            <Row className="justify-content-md-center">
                <RestrictionsForState state={state} restriction={restrictions}/>
            </Row>
        </Container>
    )
}

const RestrictionsForState = ({state, restriction}) => {
    if (state === '') {
        return null
    }
    return (
        <Row>
            {state} restrictions: {restriction}
        </Row>
    )
}

export default RestrictionsOverlay;