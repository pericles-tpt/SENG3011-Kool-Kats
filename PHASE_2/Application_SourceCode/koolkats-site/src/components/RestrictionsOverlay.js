import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {getStateRestrictionAus} from './RequestData'

const RestrictionsOverlay = ({show}) => {
    const [restrictions, setRestrictions] = useState({
        'NSW': {
            'ACT': 'Open - no permit required', 
            'QLD': 'Some areas in Queensland are considered affected areas. Read the advice for travellers from Queensland.', 
            'VIC': 'Open - no permit required',
            'WA': 'Open - no permit required',
            'SA': 'Open - no permit required',
            'NT': 'Open - no permit required',
            'TAS': 'Open - no permit required'
        },
        'ACT': {
            'NSW': 'There are no requirements to advise ACT Health you are travelling or to quarantine.', 
            'QLD': 'There are no requirements to advise ACT Health you are travelling or to quarantine.', 
            'VIC': 'There are no requirements to advise ACT Health you are travelling or to quarantine.',
            'WA': 'There are no requirements to advise ACT Health you are travelling or to quarantine.',
            'SA': 'There are no requirements to advise ACT Health you are travelling or to quarantine.',
            'NT': 'There are no requirements to advise ACT Health you are travelling or to quarantine.',
            'TAS': 'There are no requirements to advise ACT Health you are travelling or to quarantine.'
        },
        'TAS': {
            'ACT': 'Travellers to Tasmania, including returning residents, need to provide their contact and travel details before entering the State, to help manage the risk of COVID-19 at Tasmania’s borders.',
            'NSW': 'Travellers to Tasmania, including returning residents, need to provide their contact and travel details before entering the State, to help manage the risk of COVID-19 at Tasmania’s borders.', 
            'QLD': 'Travellers to Tasmania, including returning residents, need to provide their contact and travel details before entering the State, to help manage the risk of COVID-19 at Tasmania’s borders.', 
            'VIC': 'Travellers to Tasmania, including returning residents, need to provide their contact and travel details before entering the State, to help manage the risk of COVID-19 at Tasmania’s borders.',
            'WA': 'Travellers to Tasmania, including returning residents, need to provide their contact and travel details before entering the State, to help manage the risk of COVID-19 at Tasmania’s borders.',
            'SA': 'Travellers to Tasmania, including returning residents, need to provide their contact and travel details before entering the State, to help manage the risk of COVID-19 at Tasmania’s borders.',
            'NT': 'Travellers to Tasmania, including returning residents, need to provide their contact and travel details before entering the State, to help manage the risk of COVID-19 at Tasmania’s borders.'
        },
        'VIC': {
            'ACT': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.',
            'NSW': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.', 
            'QLD': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.', 
            'WA': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.',
            'SA': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.',
            'NT': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.',
            'TAS': 'Victoria has established a permit system for all domestic and New Zealand travel into Victoria. You must apply for a permit to enter Victoria from anywhere in Australia or New Zealand unless an exception or exemption applies to you.'
        },
        'QLD': {
            'ACT': 'You can enter Queensland from any Australian state or territory.There are no COVID-19 hotspots in Australia.The Queensland Border Declaration Pass system is not active. You do not need a border pass to enter Queensland.',
            'NSW': 'You can enter Queensland from any Australian state or territory.There are no COVID-19 hotspots in Australia.The Queensland Border Declaration Pass system is not active. You do not need a border pass to enter Queensland.', 
            'VIC': 'You can enter Queensland from any Australian state or territory.There are no COVID-19 hotspots in Australia.The Queensland Border Declaration Pass system is not active. You do not need a border pass to enter Queensland.', 
            'WA': 'You can enter Queensland from any Australian state or territory.There are no COVID-19 hotspots in Australia.The Queensland Border Declaration Pass system is not active. You do not need a border pass to enter Queensland.',
            'SA': 'You can enter Queensland from any Australian state or territory.There are no COVID-19 hotspots in Australia.The Queensland Border Declaration Pass system is not active. You do not need a border pass to enter Queensland.',
            'NT': 'You can enter Queensland from any Australian state or territory.There are no COVID-19 hotspots in Australia.The Queensland Border Declaration Pass system is not active. You do not need a border pass to enter Queensland.',
            'TAS': 'You can enter Queensland from any Australian state or territory.There are no COVID-19 hotspots in Australia.The Queensland Border Declaration Pass system is not active. You do not need a border pass to enter Queensland.'
        },
        'NT': {
            'ACT': 'All arrivals to the Northern Territory (NT) must: fill in a Border Entry Form and complete 14 days of mandatory supervised quarantine at your own expense*, if you have recently been in an active declared COVID-19 hot spot. This includes children returning from a hotspot.',
            'NSW': 'All arrivals to the Northern Territory (NT) must: fill in a Border Entry Form and complete 14 days of mandatory supervised quarantine at your own expense*, if you have recently been in an active declared COVID-19 hot spot. This includes children returning from a hotspot.', 
            'VIC': 'All arrivals to the Northern Territory (NT) must: fill in a Border Entry Form and complete 14 days of mandatory supervised quarantine at your own expense*, if you have recently been in an active declared COVID-19 hot spot. This includes children returning from a hotspot.', 
            'QLD': 'All arrivals to the Northern Territory (NT) must: fill in a Border Entry Form and complete 14 days of mandatory supervised quarantine at your own expense*, if you have recently been in an active declared COVID-19 hot spot. This includes children returning from a hotspot.', 
            'WA': 'All arrivals to the Northern Territory (NT) must: fill in a Border Entry Form and complete 14 days of mandatory supervised quarantine at your own expense*, if you have recently been in an active declared COVID-19 hot spot. This includes children returning from a hotspot.',
            'SA': 'All arrivals to the Northern Territory (NT) must: fill in a Border Entry Form and complete 14 days of mandatory supervised quarantine at your own expense*, if you have recently been in an active declared COVID-19 hot spot. This includes children returning from a hotspot.',
            'TAS': 'All arrivals to the Northern Territory (NT) must: fill in a Border Entry Form and complete 14 days of mandatory supervised quarantine at your own expense*, if you have recently been in an active declared COVID-19 hot spot. This includes children returning from a hotspot.'
        },
        'SA': {
            'ACT': 'There are no current COVID-19 testing or quarantine restrictions for travellers from within Australia or New Zealand. Travellers are permitted to enter providing they have completed the Cross Border Travel Registration Form prior to entry into SA.',
            'NSW': 'There are no current COVID-19 testing or quarantine restrictions for travellers from within Australia or New Zealand. Travellers are permitted to enter providing they have completed the Cross Border Travel Registration Form prior to entry into SA.', 
            'VIC': 'There are no current COVID-19 testing or quarantine restrictions for travellers from within Australia or New Zealand. Travellers are permitted to enter providing they have completed the Cross Border Travel Registration Form prior to entry into SA.', 
            'QLD': 'There are no current COVID-19 testing or quarantine restrictions for travellers from within Australia or New Zealand. Travellers are permitted to enter providing they have completed the Cross Border Travel Registration Form prior to entry into SA.', 
            'WA': 'There are no current COVID-19 testing or quarantine restrictions for travellers from within Australia or New Zealand. Travellers are permitted to enter providing they have completed the Cross Border Travel Registration Form prior to entry into SA.',
            'NT': 'There are no current COVID-19 testing or quarantine restrictions for travellers from within Australia or New Zealand. Travellers are permitted to enter providing they have completed the Cross Border Travel Registration Form prior to entry into SA.',
            'TAS': 'There are no current COVID-19 testing or quarantine restrictions for travellers from within Australia or New Zealand. Travellers are permitted to enter providing they have completed the Cross Border Travel Registration Form prior to entry into SA.'
        }, 
        'WA': {
            'ACT': 'All interstate arrivals must complete a G2G PASS declaration to enter WA.',
            'NSW': 'All interstate arrivals must complete a G2G PASS declaration to enter WA.', 
            'VIC': 'All interstate arrivals must complete a G2G PASS declaration to enter WA.', 
            'QLD': 'All interstate arrivals must complete a G2G PASS declaration to enter WA. Travellers from Queensland are permitted to enter WA without having to self-quarantine, but subject to strict conditions.', 
            'SA': 'All interstate arrivals must complete a G2G PASS declaration to enter WA.',
            'NT': 'All interstate arrivals must complete a G2G PASS declaration to enter WA.',
            'TAS': 'All interstate arrivals must complete a G2G PASS declaration to enter WA.'
        },
        '--': {}
    })
    const [stateFrom, setStateFrom] = useState('NSW')
    const [stateTo, setStateTo] = useState('ACT')
    const [link, setLink] = useState(['https://www.nsw.gov.au/covid-19/rules/border-restrictions'])
    useEffect(() => {
        console.log('state changed ', stateTo)
        async function getInfo() {
            console.log("in get info...")
            const links = []
            if (stateTo === 'NSW' || stateFrom === 'NSW' || (stateFrom === '--' && stateTo === '--')) {
                links.push('https://www.nsw.gov.au/covid-19/rules/border-restrictions')
            } 
            if (stateTo === 'ACT' || stateFrom === 'ACT' || (stateFrom === '--' && stateTo === '--')) {
                links.push('https://www.covid19.act.gov.au/community/travel')
            } 
            if (stateTo === 'TAS' || stateFrom === 'TAS' || (stateFrom === '--' && stateTo === '--')) {
                links.push('https://coronavirus.tas.gov.au/travellers-and-visitors/coming-to-tasmania')
            } 
            if (stateTo === 'VIC' || stateFrom === 'VIC' || (stateFrom === '--' && stateTo === '--')) {
                links.push('https://www.coronavirus.vic.gov.au/travel-restrictions')
            } 
            if (stateTo === 'QLD' || stateFrom === 'QLD' || (stateFrom === '--' && stateTo === '--')) {
                links.push('https://www.covid19.qld.gov.au/government-actions/border-closing')
            } 
            if (stateTo === 'NT' || stateFrom === 'NT' || (stateFrom === '--' && stateTo === '--')) {
                links.push('https://coronavirus.nt.gov.au/travel/quarantine')
            } 
            if (stateTo === 'SA' || stateFrom === 'SA' || (stateFrom === '--' && stateTo === '--')) {
                links.push('https://www.covid-19.sa.gov.au/restrictions-and-responsibilities/travel-restrictions')
            } 
            if (stateTo === 'WA' || stateFrom === 'WA' || (stateFrom === '--' && stateTo === '--')) {
                links.push('https://www.wa.gov.au/organisation/department-of-the-premier-and-cabinet/covid-19-coronavirus-travel-and-quarantine')
            } 
            setLink(links)
            //const res = await getStateRestrictionAus()
            //setRestrictions(res)
        }
        getInfo()
    }, [stateTo, stateFrom])
    return (
        <Container 
            className="justify-content-md-center" 
            style={{
                margin: '5px', 
                display: show
            }}>
            <Row className="justify-content-md-center">
                Travel Restrictions From 
                <DropdownButton id="dropdown-item-button" title={stateFrom}>
                    <Dropdown.Item as="button" onClick={() => setStateFrom('--')}>--</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateFrom('ACT')}>ACT (Canberra)</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateFrom('NSW')}>New South Wales</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateFrom('NT')}>Northern Territory</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateFrom('QLD')}>Queensland</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateFrom('SA')}>South Australia</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateFrom('TAS')}>Tasmania</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateFrom('WA')}>Western Australia</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateFrom('VIC')}>Victoria</Dropdown.Item>
                </DropdownButton>
                To
                <DropdownButton id="dropdown-item-button" title={stateTo}>
                    <Dropdown.Item as="button" onClick={() => setStateTo('--')}>--</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateTo('ACT')}>ACT (Canberra)</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateTo('NSW')}>New South Wales</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateTo('NT')}>Northern Territory</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateTo('QLD')}>Queensland</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateTo('SA')}>South Australia</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateTo('TAS')}>Tasmania</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateTo('WA')}>Western Australia</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setStateTo('VIC')}>Victoria</Dropdown.Item>
                </DropdownButton>
            </Row>
            <Row className="justify-content-md-center">
                {restrictions[stateTo][stateFrom]}
            </Row>
            <Row className="justify-content-md-center">
                For more information, view {link.join('\n')}
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