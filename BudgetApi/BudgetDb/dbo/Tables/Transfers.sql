CREATE TABLE [dbo].[Transfers] (
    [Id]                 INT           IDENTITY (1, 1) NOT NULL,
    [Amount]             FLOAT (53)    NOT NULL,
    [Date]               DATETIME2 (7) NOT NULL,
    [SendingAccountId]   INT           NOT NULL,
    [RecievingAccountId] INT           NOT NULL,
    CONSTRAINT [PK_Transfers] PRIMARY KEY CLUSTERED ([Id] ASC)
);

