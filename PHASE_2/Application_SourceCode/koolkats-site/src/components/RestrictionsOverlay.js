import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {getStateRestrictionAus} from './RequestData'

const RestrictionsOverlay = ({show}) => {
    const [restrictions, setRestrictions] = useState([{'...': 'Could not get restrictions'}])
    const [state, setState] = useState('NSW')
    useEffect(() => {
        console.log('state changed ', state)
        async function getInfo() {
            console.log("in get info...")
            if (state === 'NSW') {
                setRestrictions([
                    {'ACT': 'ACT->NSW'}, 
                    {'QLD': 'QLD->NSW'}, 
                    {'VIC': 'VIC->NSW'},
                    {'WA': 'WA->NSW'},
                    {'SA': 'SA->NSW'},
                    {'NT': 'NT->NSW'},
                    {'TAS': 'TAS->NSW'}
                ])
            } else if (state === 'ACT') {
                setRestrictions([
                    {'NSW': 'NSW->ACT'}, 
                    {'QLD': 'QLD->ACT'}, 
                    {'VIC': 'VIC->ACT'},
                    {'WA': 'WA->ACT'},
                    {'SA': 'SA->ACT'},
                    {'NT': 'NT->ACT'},
                    {'TAS': 'TAS->ACT'}
                ])
            } else if (state === 'TAS') {
                setRestrictions([
                    {'ACT': 'ACT->TAS'},
                    {'NSW': 'NSW->TAS'}, 
                    {'QLD': 'QLD->TAS'}, 
                    {'VIC': 'VIC->TAS'},
                    {'WA': 'WA->TAS'},
                    {'SA': 'SA->TAS'},
                    {'NT': 'NT->TAS'}
                ])
            } else if (state === 'VIC') {
                setRestrictions([
                    {'ACT': 'ACT->VIC'},
                    {'NSW': 'NSW->VIC'}, 
                    {'QLD': 'QLD->VIC'}, 
                    {'WA': 'WA->VIC'},
                    {'SA': 'SA->VIC'},
                    {'NT': 'NT->VIC'},
                    {'TAS': 'TAS->VIC'}
                ])
            } else if (state === 'QLD') {
                setRestrictions([
                    {'ACT': 'ACT->QLD'},
                    {'NSW': 'NSW->QLD'}, 
                    {'VIC': 'VIC->QLD'}, 
                    {'WA': 'WA->QLD'},
                    {'SA': 'SA->QLD'},
                    {'NT': 'NT->QLD'},
                    {'TAS': 'TAS->QLD'}
                ])
            } else if (state === 'NT') {
                setRestrictions([
                    {'ACT': 'ACT->NT'},
                    {'NSW': 'NSW->NT'}, 
                    {'VIC': 'VIC->NT'}, 
                    {'QLD': 'QLD->NT'}, 
                    {'WA': 'WA->NT'},
                    {'SA': 'SA->NT'},
                    {'TAS': 'TAS->NT'}
                ])
            } else if (state === 'SA') {
                setRestrictions([
                    {'ACT': 'ACT->SA'},
                    {'NSW': 'NSW->SA'}, 
                    {'VIC': 'VIC->SA'}, 
                    {'QLD': 'QLD->SA'}, 
                    {'WA': 'WA->SA'},
                    {'NT': 'NT->SA'},
                    {'TAS': 'TAS->SA'}
                ])
            } else if (state === 'WA') {
                setRestrictions([
                    {'ACT': 'ACT->WA'},
                    {'NSW': 'NSW->WA'}, 
                    {'VIC': 'VIC->WA'}, 
                    {'QLD': 'QLD->WA'}, 
                    {'SA': 'SA->WA'},
                    {'NT': 'NT->WA'},
                    {'TAS': 'TAS->WA'}
                ])
            } 
            const res = await getStateRestrictionAus()
            setRestrictions(res)
        }
        getInfo()
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
                {restrictions.map((rule, index) => (<RestrictionsForState num={index} stateTo={state} restriction={rule}/>))}
            </Row>
        </Container>
    )
}

const RestrictionsForState = ({num, stateTo, restriction}) => {
    console.log(stateTo, restriction, num)
    const ruleNum = num + 1
    const state = Object.keys(restriction)
    const rule = restriction[state]
    return (
        <Container>
            <Row>
                {ruleNum + '. Travel Restrictions from ' + state + ' to ' +stateTo+ ': '}
            </Row>
            <Row>
                {(rule) ? rule: 'Could not get restrictions'}
            </Row>
        </Container>
    )
}

export default RestrictionsOverlay;