import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {getStateRestrictionAus} from './RequestData'

const RestrictionsOverlay = ({show}) => {
    const [restrictions, setRestrictions] = useState([{'...': 'Could not get restrictions'}])
    const [state, setState] = useState('NSW')
    const [link, setLink] = useState('https://www.nsw.gov.au/covid-19/rules/border-restrictions')
    useEffect(() => {
        console.log('state changed ', state)
        async function getInfo() {
            console.log("in get info...")
            if (state === 'NSW') {
                setRestrictions([
                    {'ACT': 'Open - no permit required'}, 
                    {'QLD': 'Some areas in Queensland are considered affected areas. Read the advice for travellers from Queensland.'}, 
                    {'VIC': 'Open - no permit required'},
                    {'WA': 'Open - no permit required'},
                    {'SA': 'Open - no permit required'},
                    {'NT': 'Open - no permit required'},
                    {'TAS': 'Open - no permit required'}
                ])
                setLink('https://www.nsw.gov.au/covid-19/rules/border-restrictions')
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
                setLink('https://www.covid19.act.gov.au/community/travel')
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
                setLink('https://coronavirus.tas.gov.au/travellers-and-visitors/coming-to-tasmania')
            } else if (state === 'VIC') {
                setRestrictions([
                    {'ACT': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.'},
                    {'NSW': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.'}, 
                    {'QLD': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.'}, 
                    {'WA': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.'},
                    {'SA': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.'},
                    {'NT': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.'},
                    {'TAS': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.'}
                ])
                setLink('https://www.coronavirus.vic.gov.au/travel-restrictions')
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
                setLink('https://www.covid19.qld.gov.au/government-actions/border-closing')
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
                setLink('https://coronavirus.nt.gov.au/travel/quarantine')
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
                setLink('https://www.covid-19.sa.gov.au/restrictions-and-responsibilities/travel-restrictions')
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
                setLink('https://www.wa.gov.au/organisation/department-of-the-premier-and-cabinet/covid-19-coronavirus-travel-and-quarantine')
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
                <DropdownButton id="dropdown-item-button" title="View Restrictions to enter into States">
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
            <Row className="justify-content-md-center">
                For more information, view {link}
            </Row>
        </Container>
    )
}

const RestrictionsForState = ({num, stateTo, restriction, link}) => {
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