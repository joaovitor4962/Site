BEGIN
  DBMS_STATS.GATHER_DATABASE_STATS(
    cascade => TRUE,
    degree  => DBMS_STATS.AUTO_DEGREE
  );
END;
/

BEGIN
  FOR idx IN (
    SELECT index_name, table_owner
    FROM dba_indexes
    WHERE status = 'VALID'
      AND owner NOT IN ('SYS','SYSTEM')
  ) LOOP
    EXECUTE IMMEDIATE 'ALTER INDEX ' || idx.table_owner || '.' || idx.index_name || ' REBUILD ONLINE';
  END LOOP;
END;
/

EXEC DBMS_STATS.GATHER_DICTIONARY_STATS;

COLUMN tablespace_name FORMAT A20
COLUMN file_name FORMAT A50
SELECT tablespace_name,
       ROUND(SUM(bytes) / 1024 / 1024, 2) AS "Tamanho_MB",
       ROUND(SUM(maxbytes) / 1024 / 1024, 2) AS "Max_MB"
FROM dba_data_files
GROUP BY tablespace_name;

BEGIN
  FOR obj IN (
    SELECT object_name, object_type, owner
    FROM dba_objects
    WHERE status = 'INVALID'
  ) LOOP
    BEGIN
      EXECUTE IMMEDIATE 'ALTER ' || obj.object_type || ' ' || obj.owner || '.' || obj.object_name || ' COMPILE';
    EXCEPTION
      WHEN OTHERS THEN
        NULL;
    END;
  END LOOP;
END;
/

PURGE DBA_RECYCLEBIN;
