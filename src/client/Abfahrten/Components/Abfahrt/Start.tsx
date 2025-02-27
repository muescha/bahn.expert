import { Auslastung } from '@/client/Abfahrten/Components/Abfahrt/Auslastung';
import { DetailsLink } from '@/client/Common/Components/Details/DetailsLink';
import { Name } from '@/client/Abfahrten/Components/Abfahrt/Name';
import { Substitute } from './Substitute';
import { TravelynxLink } from '@/client/Common/Components/CheckInLink/TravelynxLink';
import { useAbfahrt } from '@/client/Abfahrten/Components/Abfahrt/BaseAbfahrt';
import { useAbfahrtenUrlPrefix } from '@/client/Abfahrten/provider/AbfahrtenConfigProvider';
import styled from '@emotion/styled';
import type { FC } from 'react';

const Container = styled.div`
  flex: 1;
  font-size: 3em;
  max-width: 5em;
  display: flex;
  flex-direction: column;
`;

const Cancelled = styled.span(({ theme }) => theme.mixins.changed);

const Links = styled.div`
  font-size: 0.6em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > a:last-of-type {
    font-size: 1.5em;
  }
`;

export const Start: FC = () => {
  const urlPrefix = useAbfahrtenUrlPrefix();
  const { abfahrt, detail, journeyId } = useAbfahrt();

  return (
    <Container data-testid="abfahrtStart">
      <Name />
      {detail && abfahrt.train.number !== '0' && (
        <Links>
          <TravelynxLink
            arrival={abfahrt.arrival}
            departure={abfahrt.departure}
            train={abfahrt.train}
            evaNumber={abfahrt.currentStopPlace.evaNumber}
          />
          <DetailsLink
            urlPrefix={urlPrefix}
            train={abfahrt.previousTrain || abfahrt.train}
            evaNumberAlongRoute={abfahrt.currentStopPlace.evaNumber}
            initialDeparture={abfahrt.initialDeparture}
            journeyId={journeyId}
          />
        </Links>
      )}
      {abfahrt.cancelled && (
        <Cancelled data-testid="cancelled">Fällt aus</Cancelled>
      )}
      {abfahrt.substitute && abfahrt.ref && (
        <Substitute substitute={abfahrt.ref} />
      )}
      {detail && <Auslastung />}
    </Container>
  );
};
