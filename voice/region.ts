/** https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure */
export interface VoiceRegion {
  /* The unique ID for the region. */
  id: string;
  /* Name of the region. */
  name: string;
  /* Whether this is the closest server to the current user's client. */
  optimal: boolean;
  /** Whether this is a deprecated voice region (avoid switching to these). */
  deprecated: boolean;
  /**	Whether this is a custom voice region (used for events/etc). */
  custom: boolean;
}

export namespace VoiceRegion {
  export namespace REST {
    export namespace GET {
      /**
       * List Voice Regions
       * GET `/voice/regions`
       *
       * Returns an array of voice region objects that can be used when setting a voice or stage channel's `rtc_region`.
       *
       * https://discord.com/developers/docs/resources/voice#list-voice-regions
       */
      export namespace ListVoiceRegions {
        export type Route = "/voice/regions";
        export const Route: Route = "/voice/regions";

        export type Response = VoiceRegion[];
      }

      export namespace GetGuildVoiceRegions {}
    }
  }
}
