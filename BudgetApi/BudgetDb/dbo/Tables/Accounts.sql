CREATE TABLE [dbo].[Accounts] (
    [Id]              INT            IDENTITY (1, 1) NOT NULL,
    [Name]            NVARCHAR (MAX) NOT NULL,
    [StartingBalance] FLOAT (53)     NOT NULL,
    [CurrentBalance]  FLOAT (53)     NOT NULL,
    [IsChecking]      BIT            NOT NULL,
    CONSTRAINT [PK_Accounts] PRIMARY KEY CLUSTERED ([Id] ASC)
);

