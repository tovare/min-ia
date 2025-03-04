import {RestRessurs, RestStatus, Årsak} from "./rest-status";
import {logger, predefinerteFeilmeldinger} from "../utils/logger";

export const getRestStatus = (responseStatus: number): RestStatus => {
  switch (responseStatus) {
    case 200: {
      return RestStatus.Suksess;
    }
    case 401: {
      return RestStatus.IkkeInnlogget;
    }
    case 403: {
      return RestStatus.IngenTilgang;
    }
    default: {
      return RestStatus.Feil;
    }
  }
};

export const fetchMedFeilhåndtering = async <T>(
  url: string,
  init?: RequestInit
): Promise<RestRessurs<T>> => {
  const response = await fetch(url, init);
  const restStatus = getRestStatus(response.status);

  if (restStatus === RestStatus.Suksess) {
    return {
      status: RestStatus.Suksess,
      data: (await response.json()) as T,
    };
  }
  if (restStatus === RestStatus.Feil) {

    logger.error(predefinerteFeilmeldinger.feilVedNettverkskall)

    try {
      const body = await response.json();

      const causedBy: string = body.causedBy;

      if (!!causedBy && Object.keys(Årsak).includes(causedBy)) {
        return {
          status: RestStatus.Feil,
          causedBy: Årsak[causedBy as keyof typeof Årsak],
        };
      }
    } catch (ignored) {
      // Ignored exception
    }
  }
  if(restStatus === RestStatus.IkkeInnlogget) {
    logger.warn(predefinerteFeilmeldinger.brukerIkkeInloggetFeil)
  }
  if(restStatus === RestStatus.IngenTilgang) {
    logger.warn(predefinerteFeilmeldinger.brukerIkkeAutorisertFeil)
  }
  return {
    status: restStatus,
  };
};
