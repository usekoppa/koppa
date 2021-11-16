export namespace Message {
  export namespace REST {
    export namespace GET {
      export namespace GetChannelMessage {}

      export namespace GetChannelMessages {}

      export namespace GetPinnedMessages {}
    }

    export namespace PATCH {
      export namespace EditMessage {}
    }

    export namespace PUT {
      export namespace PinMessage {}
    }

    export namespace POST {
      export namespace CreateChannelMessage {}

      export namespace CrosspostMessage {}

      export namespace BulkDeleteMessages {}
    }

    export namespace DELETE {
      export namespace DeleteMessage {}

      export namespace UnpinMessage {}
    }
  }
}
