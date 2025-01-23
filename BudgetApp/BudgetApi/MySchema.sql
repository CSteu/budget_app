IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [Accounts] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [StartingBalance] float NOT NULL,
    [CurrentBalance] float NOT NULL,
    [IsChecking] bit NOT NULL,
    CONSTRAINT [PK_Accounts] PRIMARY KEY ([Id])
);

CREATE TABLE [Transactions] (
    [Id] int NOT NULL IDENTITY,
    [Description] nvarchar(max) NOT NULL,
    [Amount] decimal(18,2) NOT NULL,
    [Date] datetime2 NOT NULL,
    [Category] nvarchar(max) NOT NULL,
    [IsIncome] bit NOT NULL,
    [Type] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Transactions] PRIMARY KEY ([Id])
);

CREATE TABLE [Transfers] (
    [Id] int NOT NULL IDENTITY,
    [Amount] float NOT NULL,
    [Date] datetime2 NOT NULL,
    [SendingAccountId] int NOT NULL,
    [RecievingAccountId] int NOT NULL,
    CONSTRAINT [PK_Transfers] PRIMARY KEY ([Id])
);

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Amount', N'Date', N'RecievingAccountId', N'SendingAccountId') AND [object_id] = OBJECT_ID(N'[Transfers]'))
    SET IDENTITY_INSERT [Transfers] ON;
INSERT INTO [Transfers] ([Id], [Amount], [Date], [RecievingAccountId], [SendingAccountId])
VALUES (1, 500.0E0, '2024-12-01T00:00:00.0000000', 2, 1),
(2, 617.5E0, '2024-12-15T00:00:00.0000000', 2, 1);
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Amount', N'Date', N'RecievingAccountId', N'SendingAccountId') AND [object_id] = OBJECT_ID(N'[Transfers]'))
    SET IDENTITY_INSERT [Transfers] OFF;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250107195158_InitialCreate', N'9.0.0');

COMMIT;
GO

