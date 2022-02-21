import AccessibleLink from '@app/components/parts/AccessibleLink';
import { BountyCollection } from '@app/models/Bounty';
import axios from '@app/utils/AxiosUtils';
import { Alert, AlertIcon, AlertTitle, Button, CloseButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import bountyStatus from '@app/constants/bountyStatus';
import { useState } from 'react';

const BountySubmit = ({ bounty }: { bounty: BountyCollection }): JSX.Element => {
	const router = useRouter();
	const [error, setError] = useState('');
	const upload = () => {
		// update the status of the bounty from DRAFT to OPEN before posting
		bounty.status = bountyStatus.OPEN;

		// Add the bounty to the DB
		axios.post<any, { data: { data: BountyCollection } }>(`api/bounties?customerId=${bounty.customerId}`, bounty)
			
			// on success, sent the user to the bounty/bountyId page of the newly created bounty 
			.then(({ data: res }) => {
				router.push(`/${res.data._id}`)

					// once on the 'live' bounty page, remove all the prev bounty data
					// from localstorage
					.then(() => {
						localStorage.removeItem('cachedEdit');
						localStorage.removeItem('previewBounty');
					});
			})
			// if there was a problem, log the error to the console
			.catch(err => {
				const errorData = err.response?.data;
				setError('There was a problem submitting the bounty');
				// cannot assume shape of error but we prefer to get the response data
				errorData ? console.debug({ errorData }) : console.debug({ err });
			}
			);
	};
	return (
		<>
			<AccessibleLink href={'/create-bounty'}>
				<Button my={2} size="sm">
				Edit This Draft
				</Button>
			</AccessibleLink>
			<Button
				m={2}
				size="sm"
				colorScheme="primary"
				onClick={() => upload()}
			>
			Confirm
			</Button>
			{
				error &&
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle mr={2}>{error}</AlertTitle>
					<CloseButton position='absolute' right='8px' top='8px' onClick={() => setError('')} />
				</Alert>
			}
		</>
	);
};

export default BountySubmit;